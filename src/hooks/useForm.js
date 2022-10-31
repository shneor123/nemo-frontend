import { useState } from "react"

export const useForm = (initialFields) => {
    const [fields, setFields] = useState(initialFields)

    const handleChange = ({target}) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFields((prevFields) => ({...prevFields, [field]:value}))
    }

    const clearFields = (field) => {
        setFields((prevFields) => {
            if (field) {
                return {...prevFields, [field]: ''}
            }
            const newObj = {}
            for (const i in prevFields) {
                newObj[i] = ''
             }
             return newObj
            })
    }



    return [
        fields,
        handleChange,
        clearFields,
        setFields
    ]
}