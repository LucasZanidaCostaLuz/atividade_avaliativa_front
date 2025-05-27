"use client"

import styles from "./bairros.module.css";
import { useState, useEffect} from "react";
import { Skeleton, Pagination, Card, Modal } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HEADERS = {'x-api-key': process.env.NEXT_PUBLIC_API_KEY}

export default function Bairros() {
    const [data, setData] = useState({
        bairros: [],
        loading: false,
        current: 1,
        pageSize: 0,  
    })

    const [modal, setModal] = useState ({
        visible: false,
        bairro: null,
        ocorrencia: null,
        loading: false,
    })

    useEffect(() => {
        const fetchBairros = async () => {
            try{
                const {data: bairros} = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bairros`, {
                    headers: HEADERS
                })
                setData({bairros, loading: true, pageSize: 5, current: 1});
            }catch{
                toast.error("Erro ao buscar Bairros")
                setData((b) => ({...b, loading: false}))
            }
        };
        fetchBairros()
    }, [])

    useEffect(() => {
        const openModal = async (bairro) => {
            try{
                const {modal: ocorrencia} = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ocorrencias/${bairro.id}`, {
                    headers: HEADERS
                }) 
                setModal((m) => ({...m, ocorrencia, loading: true}))
            }catch{
                toast.error("Erro ao gerar modal")
                setModal((m) => ({...m, loading: false}))
            }
        };
    })

    const paginatedBairro = () =>
    {
        const start = (data.current - 1) * data.pageSize;
        return data.bairros.slice(start, start + data.pageSize)
    }

    return (
        <div>
            <h1>Lista de Bairros</h1>
            <Pagination
            current={data.current}
            pageSize={data.pageSize}
            total={Array.isArray(data.bairros) ? data.bairros.length : 0}
            onChange={(page, size) => setData((b) => ({...b, pageSize: size, current: page}))}
            showSizeChanger
            pageSizeOptions={["5", "10", "50"]}
            />

        
        {loading ? (
            <Skeleton active />
        ) : (
            <div className={styles.cardContainer}>
                {paginatedBairro().map((bairro) => 
                )}
            </div>
        </div>
    );
}
