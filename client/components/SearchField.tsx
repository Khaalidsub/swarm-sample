import { CommentSearch } from "../types"
export interface SearchFieldProps {


    searchValue: string
    typeValue: CommentSearch
    onSearchHandler: Function
    onTypeSearchHandler: Function
}

export default function SearchField(props: SearchFieldProps) {

    return (
        <div className="shadow-md rounded-lg flex-auto">
            <input value={props.searchValue} onChange={(e) => props.onSearchHandler(e.target.value)} className="py-4 ml-2 px-2 rounded-lg focus:outline-none w-5/6" type="text" placeholder="Search Based on" />
            <select value={props.typeValue} onChange={(e) => props.onTypeSearchHandler(e.target.value)} className="px-2 focus:outline-none mr-2 py-2">
                <option value={CommentSearch.name}>
                    {CommentSearch.name}
                </option>
                <option value={CommentSearch.email}>
                    {CommentSearch.email}
                </option>
                <option value={CommentSearch.body}>
                    {CommentSearch.body}
                </option>
            </select>
        </div>
    )
}

