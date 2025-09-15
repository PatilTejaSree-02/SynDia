// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import styles from './DiseaseUploadPage.module.css';

// function DiseaseUploadPage() {
//     const { diseaseName } = useParams();
//     const [file, setFile] = useState(null);
//     const [uploadError, setUploadError] = useState(null);
//     const navigate = useNavigate();
//     const [processing, setProcessing] = useState(false);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//         setUploadError(null);
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             setUploadError('Please select a CSV file.');
//             return;
//         }

//         setProcessing(true);
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post(`http://127.0.0.1:5000/api/upload/${diseaseName}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             setProcessing(false);
//             if (response.data.status === 'success') {
//                 navigate(`/results/${diseaseName}`, { state: { results: response.data } });
//             } else {
//                 setUploadError(response.data.error || 'Processing failed.');
//             }
//         } catch (error) {
//             setProcessing(false);
//             setUploadError('An unexpected error occurred during upload and processing.');
//             console.error('Upload and processing error:', error);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.title}>Upload {diseaseName} Dataset</h1>
//             <input type="file" accept=".csv" onChange={handleFileChange} className={styles.fileInput} />
//             {uploadError && <p className={styles.error}>{uploadError}</p>}
//             <button onClick={handleSubmit} className={styles.uploadButton} disabled={processing}>
//                 {processing ? 'Processing...' : 'Upload and Process'}
//             </button>
//             {processing && <div className={styles.loading}>Processing data...</div>}
//         </div>
//     );
// }

// export default DiseaseUploadPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DiseaseUploadPage.module.css';

function DiseaseUploadPage() {
    const { diseaseName } = useParams();
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadError(null);
    };

    const handleSubmit = async () => {
        if (!file) {
            setUploadError('Please select a CSV file.');
            return;
        }

        setProcessing(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/upload/${diseaseName}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setProcessing(false);
            navigate(`/results/${diseaseName}`, { state: { results: response.data } });

        } catch (error) {
            setProcessing(false);
            setUploadError(error.response?.data?.error || 'An unexpected error occurred during upload and processing.');
            console.error('Upload and processing error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Upload {diseaseName} Dataset</h1>
            <input type="file" accept=".csv" onChange={handleFileChange} className={styles.fileInput} />
            {uploadError && <p className={styles.error}>{uploadError}</p>}
            <button onClick={handleSubmit} className={styles.uploadButton} disabled={processing}>
                {processing ? 'Processing...' : 'Upload and Process'}
            </button>
            {processing && <div className={styles.loading}>Processing data...</div>}
        </div>
    );
}

export default DiseaseUploadPage;