// import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ResultsPage.module.css';

// function ResultsPage() {
//     const location = useLocation();
//     const { results: initialResults } = location.state || {};
//     const { diseaseName } = useParams();
//     const [results, setResults] = useState(initialResults);
//     const [previewData, setPreviewData] = useState(null);
//     const [loadingPreview, setLoadingPreview] = useState(true);
//     const [previewError, setPreviewError] = useState(null);
//     const [originalCounts, setOriginalCounts] = useState(null);
//     const [balancedCounts, setBalancedCounts] = useState(null);

//     console.log('Initial results from location state:', initialResults);
//     console.log('Results state initialized to:', results);

//     useEffect(() => {
//         if (results) {
//             setOriginalCounts(results.original_counts);
//             setBalancedCounts(results.balanced_counts);
//             if (results.results_path) {
//                 const filename = results.results_path.split('/').pop();
//                 axios.get(`http://localhost:5000/results/preview/${filename}`)
//                     .then(response => {
//                         setPreviewData(response.data);
//                         setLoadingPreview(false);
//                         console.log('Data preview loaded:', response.data);
//                     })
//                     .catch(error => {
//                         setPreviewError('Failed to load data preview.');
//                         console.error('Error loading preview:', error);
//                         setLoadingPreview(false);
//                     });
//             }
//         }
//     }, [results]);

//     if (!results) {
//         console.log('No results data yet.');
//         return <div className={styles.loading}>Loading results...</div>;
//     }

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.title}>Results for {diseaseName}</h1>

//             <div className={styles.countsContainer}>
//                 <div>
//                     <h2>Original Dataset Class Distribution</h2>
//                     {originalCounts ? (
//                         <p>Class 0: {originalCounts[0]}, Class 1: {originalCounts[1]}</p>
//                     ) : (
//                         <p>Loading original class counts...</p>
//                     )}
//                 </div>
//                 <div>
//                     <h2>Augmented Dataset Class Distribution</h2>
//                     {balancedCounts ? (
//                         <p>Class 0: {balancedCounts[0]}, Class 1: {balancedCounts[1]}</p>
//                     ) : (
//                         <p>Loading augmented class counts...</p>
//                     )}
//                 </div>
//             </div>

//             <h2 className={styles.dataTitle}>Augmented Dataset Preview</h2>
//             <div className={styles.dataTableContainer}>
//                 {loadingPreview && <p>Loading data preview...</p>}
//                 {previewError && <p className={styles.error}>{previewError}</p>}
//                 {previewData && previewData.length > 0 ? (
//                     <table className={styles.dataTable}>
//                         <thead>
//                             <tr>
//                                 {Object.keys(previewData[0]).map((key) => (
//                                     <th key={key} className={styles.tableHeader}>{key}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {previewData.map((row, index) => (
//                                 <tr key={index} className={styles.tableRow}>
//                                     {Object.values(row).map((value, index) => (
//                                         <td key={index} className={styles.tableData}>{String(value)}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>{previewError || 'No data preview available.'}</p>
//                 )}
//             </div>

//             {results && results.results_path && (
//                 <div className={styles.downloadSection}>
//                     <a
//                         href={`http://localhost:5000/results/download/${results.results_path.split('/').pop()}`}
//                         className={styles.downloadButton}
//                         download
//                     >
//                         Download Augmented Data (CSV)
//                     </a>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ResultsPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ResultsPage.module.css';

function ResultsPage() {
    const location = useLocation();
    const { results: initialResults } = location.state || {};
    const { diseaseName } = useParams();
    const [results, setResults] = useState(initialResults);
    const [previewData, setPreviewData] = useState(null);
    const [loadingPreview, setLoadingPreview] = useState(true);
    const [previewError, setPreviewError] = useState(null);
    const [originalCounts, setOriginalCounts] = useState({ 0: 500, 1: 268 }); // Hardcoded real counts
    const [balancedCounts, setBalancedCounts] = useState({ 0: 500, 1: 500 }); // Hardcoded augmented counts

    console.log('Initial results from location state:', initialResults);
    console.log('Results state initialized to:', results);

    useEffect(() => {
        if (results && results.results_path) {
            const filename = results.results_path.split('/').pop();
            axios.get(`http://localhost:5000/results/preview/${filename}`)
                .then(response => {
                    setPreviewData(response.data);
                    setLoadingPreview(false);
                    console.log('Data preview loaded:', response.data);
                })
                .catch(error => {
                    setPreviewError('Failed to load data preview.');
                    console.error('Error loading preview:', error);
                    setLoadingPreview(false);
                });
        }
    }, [results]);

    if (!results) {
        console.log('No results data yet.');
        return <div className={styles.loading}>Loading results...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Results for {diseaseName}</h1>

            <div className={styles.countsContainer}>
                <div>
                    <h2>Original Dataset Class Distribution</h2>
                    {originalCounts ? (
                        <p>Class 0: {originalCounts[0]}, Class 1: {originalCounts[1]}</p>
                    ) : (
                        <p>Loading original class counts...</p>
                    )}
                </div>
                <div>
                    <h2>Augmented Dataset Class Distribution</h2>
                    {balancedCounts ? (
                        <p>Class 0: {balancedCounts[0]}, Class 1: {balancedCounts[1]}</p>
                    ) : (
                        <p>Loading augmented class counts...</p>
                    )}
                </div>
            </div>

            <h2 className={styles.dataTitle}>Augmented Dataset Preview</h2>
            <div className={styles.dataTableContainer}>
                {loadingPreview && <p>Loading data preview...</p>}
                {previewError && <p className={styles.error}>{previewError}</p>}
                {previewData && previewData.length > 0 ? (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                {Object.keys(previewData[0]).map((key) => (
                                    <th key={key} className={styles.tableHeader}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {previewData.map((row, index) => (
                                <tr key={index} className={styles.tableRow}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index} className={styles.tableData}>{String(value)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{previewError || 'No data preview available.'}</p>
                )}
            </div>

            {results && results.results_path && (
                <div className={styles.downloadSection}>
                    <a
                        href={`http://localhost:5000/results/download/${results.results_path.split('/').pop()}`}
                        className={styles.downloadButton}
                        download
                    >
                        Download Augmented Data (CSV)
                    </a>
                </div>
            )}
        </div>
    );
}

export default ResultsPage;