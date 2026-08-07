import { useState, useEffect } from "react";
import useTask from "./useTask";


export default function useForm({ initialTitle = '', initialDesc = '', initialDate = '', initialPriority = '', initialStatus = '' } = {}) {

    const [title, setTitle] = useState(initialTitle);
    const [desc, setDesc] = useState(initialDesc);
    const [date, setDate] = useState(initialDate);
    const [priority, setPriority] = useState(initialPriority);
    const [status, setStatus] = useState(initialStatus);

    return { title, setTitle, desc, setDesc, date, setDate, priority, setPriority, status, setStatus };
}
