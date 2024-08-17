import Auth from './Auth/_router.js';
export default async(app)=>{
    app.use('/auth',Auth)
}
