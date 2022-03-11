const Success = result => {
    return {
        success: true,
        data: result,
        date: new Date() 
    }
}

const Fail = error => {
    return {
        success: false,
        error: error,
        date: new Date()
    }
}

module.exports = {
    Success,
    Fail
}