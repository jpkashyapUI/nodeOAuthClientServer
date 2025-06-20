const jwt =  require('jsonwebtoken')

const authentication = async (req, res, next) => {

    console.log('authentication ')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer token
    console.log(token)
    if (token) {
        try {
            const decodedValue = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decodedValue);
            req.user = decodedValue
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token!!"
            })
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "No Token available!!"
        })
    }

}

module.exports = { authentication }