/* eslint-disable react/prop-types */


function FormField({ name, type, placeholder, value, onChange,label ,className, span,values ,option,chosen}) {
    return (
       <>
    {label? <label id={name} className="label" htmlFor={name}>{ label}</label>:null}
        
    {type === "dropdown" ? <select className={className} value={value} onChange={onChange} name={name}>
            {values.map((value, idx) => <option key={idx} value={value}>{value}</option>)}
        </select> : <input checked={value} id={name} value={value} onChange={onChange} name={name} className={className} type={type} placeholder={placeholder} />}
            {chosen ? chosen : null}
       
        {span? <span id={name} htmlFor={name}>{span}</span>:null}
       </>
    )
}
export default function Form({ isEdit=false ,formFields, onSubmit, error, errorMessages, btn,btnup ,className}) {

    return <form  onSubmit={onSubmit}>
        {
            formFields.map((field, index) => (
                <>
                    <FormField value={field.value} 
                    className={field.className} 
                    values={field.values} option={field.option} chosen={field.chosen} onChange={field.onChange} name={field.name} type={field.type} span={field.span}
                    placeholder={field.placeholder}
                    label={field.label} key={index} />
                    {error[field.name] ? <p>{errorMessages[field.name].message}</p> : null

                    }
                </>
            ))
        }
        <br />
        <button className={className} type="submit">{isEdit? btnup:btn}</button>
    </form >

}