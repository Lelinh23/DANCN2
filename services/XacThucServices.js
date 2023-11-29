const MongoDB = require('./mongodb');
const {mongoConfig, tokenSecret} = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config');

const userDangKy = async(user) =>{
    try {
        if (!user?.username || !user?.email || !user?.password) {
            return {
                status: false,
                message: "Không được để trống bất kì mục nào"
            }
        }

        //băm mật khẩu của users bằng thư viện bcrypt với hệ số chi phí là 10
        const passwordHash = await bcrypt.hash(user?.password, 10)

        let userObject ={
            username: user?.username,
            email: user?.email,
            password: passwordHash
        };

        let savedUser = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .insertOne(userObject);
      if (savedUser?.acknowledged && savedUser?.insertedId) {

        let token = jwt.sign(
            {username: userObject?.username, email: userObject?.email}, 
            tokenSecret, 
            {expiresIn: '24h'}
            );

        return {
            status: true,
            message: "Bạn đã đăng ký thành công",
            data: token
        }
      } else {
        return {
            status: false,
            message: "Bạn đã đăng ký thất bại"
        };
      }
    } catch (error) {
        console.log(error);

        if (error.code === 11000 && error?.keyPattern?.username) {
            return {
              status: false,
              message: "Tên đăng nhập đã tồn tại",
              error: error
            };
        }

        if (error.code === 11000 && error?.keyPattern?.email) {
            return {
              status: false,
              message: "Email đã tồn tại",
              error: error
            };
        }
    }
};

// xử lý đăng nhập
const userDangNhap = async (user) => {
    try {
        if (!user?.email || !user?.password) {
            return {
                status: false,
                message: "Không được để trống bất kỳ mục nào",
            };
        }

        let userObject = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({ email: user?.email });

        if (userObject) {
            let isPasswordCorrect = await bcrypt.compare(
                user?.password,
                userObject?.password
            );

            if (isPasswordCorrect) {
                let token = jwt.sign(
                    { username: userObject?.username, email: userObject?.email },
                    tokenSecret,
                    { expiresIn: '24h' }
                );

                return {
                    status: true,
                    message: "Bạn đã đăng nhập thành công",
                    data: token,
                };
            } else {
                return {
                    status: false,
                    message: "Sai mật khẩu",
                };
            }
        } else {
            return {
                status: false,
                message: "Không tìm thấy người dùng",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Đăng nhập thất bại",
            error: error,
        };
    }
};

// xử lý người dùng hiện tại
const checkExistUser = async (query) => {
    try {

        let messages = {
            email: "Email này đã tồn tại",
            username: "Tên người dùng này đã tồn tại",
          };

        let queryType = Object.keys(query)[0]

        let userObject = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .findOne(query);

        console.log(userObject);

        return !userObject ? 
        {status: true, message: `Chưa có người dùng sử dụng ${queryType} này`} : {status: false, message: messages[queryType]}
    } catch (error) {
        
    }
}

// kiểm tra và xác thực token trong các yêu cầu đến một app
const XacMinhToken = async (req, res, next) => {
    console.log(
      `XacThucServices | XacMinhToken | ${req?.originalUrl}`
    );
  
    try {
        if (
            req?.originalUrl.includes("/login") ||
            req?.originalUrl.includes("/exist-user") ||
            req?.originalUrl.includes("/register")
        )
            return next();
        let token = req?.headers["authorization"];
        if (token && token.startsWith('Bearer')) {
            token = token.slice(7, token?.length);
            jwt.verify(token, config.tokenSecret, (error, decoded) => {
                if(error) {
                    res.status(401).json({
                        status: false,
                        message: error?.name ? error?.name : "Token Không Hợp Lệ",
                        error: `Token Không Hợp Lệ | ${error?.message}`,
                    })
                } else {
                    req.email = decoded?.email;
                    next()
                }
            })
        } else {
            res.status(401).json({
                status: false,
                message: "Thiếu Token",
                error: "Thiếu Token",
            })
        }
    } catch (error) {
      // Xử lý lỗi nếu có
      // Có thể trả về mã trạng thái 500 Internal Server Error hoặc phản hồi lỗi khác.
      res.status(401).json({
        status: false,
        message: error?.message ? error?.message : "Xác Nhận Thất Bại",
        error: `Xác Nhận Thất Bại | ${error?.message}`,})
    }
};
  
const CapNhatToken = async (req, res) => {
    // Logic cập nhật token
    console.log(
        `XacThucServices | CapNhatToken | ${req?.originalUrl}`
    );
    try {
        let token = req?.headers["authorization"];
        if (token && token.startsWith('Bearer')) {
            token = token.slice(7, token?.length);
            jwt.verify(token, config.tokenSecret, {ignoreExpriration: true}, async (error, decoded) => {
                if(error) {
                    res.status(401).json({
                        status: false,
                        message: error?.name ? error?.name : "Token Không Hợp Lệ",
                        error: `Token Không Hợp Lệ | ${error?.message}`,
                    })
                } else {
                    if (decoded?.username && decoded?.email) {
                        let newtoken = jwt.sign(
                            { username: decoded?.username, email: decoded?.email },
                            tokenSecret,
                            { expiresIn: '24h' })
                        
                        res.json({
                            status: true,
                            message: "Cập nhật Token thành công",
                            data: newtoken
                        })
                    } else {
                        res.status(401).json({
                            status: false,
                            message: error?.name ? error?.name : "Token Không Hợp Lệ",
                            error: `Token Không Hợp Lệ | ${error?.message}`,
                        })
                    }
                }
            })
        } else {
            res.status(401).json({
                status: false,
                message: error?.name ? error?.name : "Thiếu Token",
                error: `Thiếu Token | ${error?.message}`,
            })
        }
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error?.name ? error?.name : "Cập nhật Token thất bại",
            error: `Cập nhật Token thất bại | ${error?.message}`,
        })
    }
};

module.exports = {userDangKy, userDangNhap, checkExistUser, XacMinhToken, CapNhatToken};