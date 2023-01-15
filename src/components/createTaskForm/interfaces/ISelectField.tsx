import { SelectChangeEvent } from "@mui/material/Select";
import { IDisabled } from "./IDisabled";

export type ISelectItems={
    value: string
    label: string
}

export interface ISelectField extends IDisabled{
    name?: string
    label?: string
    value?: string
    onChange?: (e:SelectChangeEvent) =>void
    items?: ISelectItems[]

}