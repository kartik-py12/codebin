
export const validate = (Schema) => (req,res,next) => {
    try {
        const result= Schema.safeParse(req.body);
        if(!result.success){
            console.log(result.error.issues);
            return res.status(400).json({
                success:false,
                errors:result.error.issues.map((issue)=>({
                    path:issue.path,
                    message:issue.message
                }))
            })

        }else{
            req.validated=result.data;
            next();
        }
    } catch (error) {
        console.log(`Error in validation middleware ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}