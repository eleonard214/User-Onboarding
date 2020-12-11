import React,{useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';


function Form(){
const [users, setUsers]=useState([]);

const [error, setError]=UseState("");

const [post, setPost]=useState([]);



const [formState, setFormState]=useState({
    fName:"",
    email:"",
    password:"",
    terms:false
});

const [buttonDisable, setButtonDisable]=useState(true)

const formSchema=yup.object().shape({
    fname: yup.string()
    .required("We NEED your name!")
    .test(
        "This name is already on list",
        value => (users.map(item => {
            return (item.fName !== value)
        }))
    ),
    email: yup.string()
    .email("Enter email here!")
    .required("We REALLY NEED your email!!"),

    password:yup.string()
    .required("You REALLY REALLY NEED a password!!!")
    .min(6, "Password REALLY REALLY REALLY NEEDS to be 6 characters!!!!"),

    terms:yup.boolean()
    .oneOf([true])
    .required("We REALLY REALLY REALLY REALLY NEED you to agree!!!!!"),


})

const [errorState, setErrorState]=useState({
    fname:"",
    email:"",
    password:"",
    terms:""
})

const handleChange = e => {
    yup.reach(formSchema, e.target.name)
    .validate((e.target.type==="checkbox") ? e.target.checked :e.target.value)
    .then(valid => {
        console.log("just checking", e.target.name)
        setErrorState({...errorState, [e.target.name]:""})
    })
    .catch((err)=> {
        console.log("err in validate=", err.errors)
        setErrorState({...errorState, [e.target.name]:err:errors[0]})
    })
}

const handleSubmit = (e)=> {
    e.preventDefault();
    console.log('onsubmit state=', formState)
axios
    .post('https://regres.in/api/users', formState)
    .then((res)=> {
        console.log('Response post api =', res.data)
        setUsers([...users, res.data])

        setError(null);

        setFormState({
            fname:"",
            email:"",
            password:"",
            terms:false        })
    })
    .catch((err)=>{
        setError(':( That Happened ):');
    });
}

useEffect(()=>{
    formSchema.isValid(formState)
    .then((valid)=>{
        console.log(':) VALID (:', errorState)
        setButtonDisable(!valid)
    })
},[formState])

return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="fNAme">
            Your name
            <input
            onChange={handleChange}
            id="fName"
            type="text"
            name="fName"
            value={formState.fName}
            placeholder="Give us your name!"/>
            {errorState.fName.length>0 ? <p className="error">{errorState.fName}</p> : null}
        </label>
        <label htmlFor="email">
            Email
            <input
            onChange={handleChange}
            id="email"
            type="email"
            name="email"
            value={formState.email}
            placeholder="Give us your email!"/>
            {errorState.email.length>0 ? <p className="error">{errorState.email}</p> : null}
        </label>
        <label htmlFor="terms" className="terms">
            Terms and Conditions:
            <input
            className="terms"
            onChange={handleChange}
            type="checkbox"
            id="terms"
            name="terms"
            checked={formState.terms}/>
            {errorState.terms.length>0 ? <p className="error">{errorState.terms}</p> : null}
        </label>

        <button type="submit"
        onClick={handleSubmit}
        disabled={buttonDisable}>Submit</button>
        <pre>{JSON.stringify(users, null, 2)}</pre>
        <h3>User List!!!</h3>
        <div className="info">{users.map((item)=>{
            return <div key={item.fname}></div>})}</div>
    </form>
)
}

