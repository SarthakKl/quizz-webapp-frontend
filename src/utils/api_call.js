import axios from 'axios'


// axios.defaults.baseURL = 'https://quizz-backend.herokuapp.com/'
// axios.defaults.baseURL = 'http://localhost:3002/'
axios.defaults.baseURL = 'https://quizz-webapp-backend.vercel.app/'
// const baseUrlToken = 'https://opentdb.com/api_token.phsp'
const tokenKey = 'quizzUserToken'

export async function fetchQuestion(category, catIndex, difficulty){
    console.log(category,catIndex,difficulty)
    try{
        const response = await axios({
            method:'get',
            url:'fetchQuestion',
            params:{
                category:category,
                index:catIndex,
                difficulty:difficulty, 
            }
        })
        console.log(response)
        return response.data
    }
    catch(error){
        console.log(error)
        return {error: error}
    }
}
export async function performLogin(email, password){
    try{
        const response = await axios({
            method:'post',
            url:'Login',
            data:{
                email:email,
                password:password
            }
        })
        if(response.data && response.data.token){
            axios.defaults.headers['authorization'] = response.data.token
            localStorage.setItem(tokenKey, response.data.token)
        }
        return response.data
    }
    catch(error){
        console.log(error.message)
        return {error:error.message}
    }
}

export async function performSignup(email, password){
    try{
        console.log("performing signup")
        const response = await axios({
            method:'post',
            url:'Signup',
            data:{
                email:email,
                password:password
            }
        })
        console.log(response)
        if(response.data && response.data.token){
            axios.defaults.headers['Authorization'] = response.data.token
            localStorage.setItem(tokenKey, response.data.token)
        }
        return response.data
    }
    catch(error){
        console.log(error)
        return {error:error.message}
    }
}
export async function updateSelection(optionSelected, questionId, quizId, hasEnded){
    // console.log(quizId, questionId, optionSelected)
    try {
        const response = await axios({
            method:'patch',
            url:'update-selection',
            data:{
                optionSelected: optionSelected,
                questionId: questionId,
                quizId: quizId,
                hasEnded:hasEnded
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {error:error.message}
    }
}
export const checkIncompleteQuiz = async () => {
    try {
        const response = await axios({
            url:'incomplete-quiz-lookup',
            method:'get'
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {error}
    }
}
export const deleteIncompleteQuiz = async (quizId) => {
    try {
        const response = await axios({
            method:'patch',
            url:'delete-incomplete-quiz',
            data:{
                quizId:quizId
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {error}
    }
}
export const verifyUser = async (user_id, token) =>{
    try {
        console.log(token)
        const response = await axios({
            method:'get',
            url:'verify',
            params:{
                token:token,
                user_id:user_id
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {error:(error?.response?.data?.message || error.message)}
    }
}
export const resendVerificationMail = async (userId) => {
    try {
        const response = await axios({
            method:'get',
            url:'reverify',
            params:{
                userId:userId
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return {error:error?.response.data.message || error.message}
    }
}
// export async function getSessionToken(){
//     try{
//         const response = await axios({
//             method:'get',
//             url:baseUrlToken,
//             params:{
//                 command:'request'
//             }
//         })
//         // console.log(response.data)
//         return response.data
//     }
//     catch(error){
//         console.log(error)
//     }
// }
// export async function resetToken(sessionToken){
//     try{
//         const response = await axios({
//             method:'get',
//             url:baseUrlToken,
//             params:{
//                 commmand:'reset',
//                 token:sessionToken
//             }
//         })
//         // console.log(response.data)
//         return response.data
//     }
//     catch(error){
//         console.log(error)
//     }
// }