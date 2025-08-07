import { Field, Input } from "@chakra-ui/react"
import React from "react"

export default function InputTemplate ({ id, onChange, name, label }:
    {
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        name?: string,
        label: string
    })
{
    return (
        <Field.Root required>
            <Field.Label>
                {label}
            </Field.Label>
            <Input
                display="inherit"
                onChange={onChange}
                required
                placeholder="Enter Text"
                className="placeholder:text-center"
                variant="subtle"
                id={id}
                name={name}
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>
    )
}
