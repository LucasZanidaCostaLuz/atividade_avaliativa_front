"use client"

import styles from "./bairros.module.css";
import { useState, useEffect} from "react";
import { Skeleton, Pagination, Card, Modal } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {Image} from "next/image";
import { useRouter } from "next/navigation"; 

const HEADERS = {'x-api-key': process.env.NEXT_PUBLIC_API_KEY}

export default function Mapa() {
    const [data, setData] = useState({
        bairros: [],
        loading: false,
        current: 1,
        pageSize: 0,  
    })

    const [modal, setModalInfo] = useState ({
        visible: false,
        bairro: null,
        ocorrencia: null,
        loading: false,     
    })

    const [redirectLoading, setRedirectLoading] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const fetchBairros = async () => {
            try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bairros`, {
                headers: HEADERS
            });
            setData((d) => ({...d, bairros: response.data, loading: false,}));
            toast.success('Bairros carregados com sucesso!');
            } catch (error) {
            toast.error('Erro ao buscar bairros!');
            setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchBairros();
    }, []);

        const openModal = async (bairro, ocorrencia) => {
        try {
                setModalInfo({ visible: true, bairro, ocorrencia: null, loading: true });
                const response = await axios.get(`${NEXT_PUBLIC_API_URL}/ocorrencias/${ocorrencia.id}}`, {
                    headers: HEADERS,
                });
                setModalInfo({ visible: true, bairro: bairro.nome, ocorrencia: response.data , loading: false });
            } catch (error) {
                toast.error('Erro ao buscar ocorrências!');
                setModalInfo({ visible: true, bairro, ocorrencia: null, loading: false });
            }
        };

    const paginatedBairros = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.bairros.slice(start, start + data.pageSize);
    };


    return (
        <div className={styles.main}>
            <Pagination
                current={data.current}
                pageSize={data.pageSize || 10}
                total={data.bairros.length}
                onChange={(page, pageSize) => setData(prev => ({
                    ...prev,
                    current: page,
                    pageSize: pageSize,
                }))}
            />
            {redirectLoading && ( 
                <Image src="/image/carregando.gif" alt="carregando" whidth={220}height={220} className={styles.loadingImage}  />
            )}
            <h1 className={styles.title}>Bairros</h1>
            <div className={styles.bairrosContainer}>
                {data.loading ? (
                    <Skeleton active />
                ) : (
                    paginatedBairros().map((bairro) => (
                        <Card
                            key={bairro.id}
                            title={bairro.nome}
                            className={styles.card}
                            onClick={() => openModal()} 
                        >
                            <span className={styles.span}>Cidade: {bairro.cidade} | Estado: {bairro.estado}</span>
                            <span className={styles.span}>ID: {bairro.id} | Nome: {bairro.nome}</span> 
                        </Card>
                    ))
                )}
            </div>
            <Modal
                open={modal.visible} 
                title={modal.bairro}
                onCancel={() => setModalInfo({ visible: false, bairro: null, ocorrencias: null, loading: false })} 
                footer={null}
            >
                {modal.loading ? ( 
                    <Skeleton active />
                ) : modal.ocorrencia ? ( 
                    <div>
                        <h3>Ocorrências:</h3>
                        <ul>
                            {modal.ocorrencia.map((ocorrencia, bairro) => (
                                <li key={ocorrencia.id}>
                                    <strong>ID:</strong> {ocorrencia.id} 
                                    <strong>Local:</strong> {ocorrencia.bairro_id ? bairro.nome : 'Desconhecido'}
                                    <strong> Descrição:</strong> {ocorrencia.descricao}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Nenhuma ocorrência encontrada.</p>
                )}
            </Modal>
            <ToastContainer position='top-right' autoClose={4500} />
        </div>
    ) 
}
