export const loginState =()=>{
    //user bilgilerini çağırma
    const login = localStorage.getItem("userdata");
    return login;
}

export const setloginState =(username)=>{
    console.log(username)
    //user bilgilerini kaydetme
   localStorage.setItem("userdata", username);
}


export const removeloginState =()=>{
    //user bilgilerini silme
 localStorage.removeItem("userdata");
}

