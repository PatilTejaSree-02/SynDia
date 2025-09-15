import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './DiseaseListPage.module.css';

function DiseaseListPage() {
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/diseases')
            .then(response => {
                setDiseases(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load diseases.');
                console.error('Error loading diseases:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading disease list...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.diseaseListPage}>
            <div className={styles.leftSection}></div>
            <div className={styles.middleSection}>
                <h1 className={styles.title}>Choose the Disease</h1>
                <div className={styles.diseaseList}>
                    {diseases.map((disease) => (
                        <Link to={`/upload/${disease.name}`} key={disease.name} className={styles.diseaseItem}>
                            <h2 className={styles.diseaseName}>{disease.name}</h2>
                            {disease.requires_upload && <span className={styles.uploadRequired}></span>}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.rightSection}></div>
        </div>
    );
}

export default DiseaseListPage;