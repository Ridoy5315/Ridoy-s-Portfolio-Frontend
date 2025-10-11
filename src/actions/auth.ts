import { FieldValues } from "react-hook-form";


export const login = async(data: FieldValues) => {
     const res = await fetch(`${process.env.BASE_API}/auth/login`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
     })

     console.log(res)
}