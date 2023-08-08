import React from "react";
import styles from "../Paginado/Paginado.module.css";

const Paginado = ({ productsPerPage, totalProducts, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const maxVisiblePages = 4;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    if (startPage <= 0) {
        startPage = 1;
        endPage = Math.min(maxVisiblePages, totalPages);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const renderPaginationItems = () => {
        const paginationItems = [];

        

        paginationItems.push(
            <li key="prev">
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Prev
                </button>
            </li>
        );

        if (startPage > 1) {
            paginationItems.push(
                <li key="ellipsisStart" className={styles.ellipsis}>
                    ...
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <li key={i} className={currentPage === i ? styles.active : ""}>
                    <button className={styles.pageButton} onClick={() => onPageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        if (endPage < totalPages) {
            paginationItems.push(
                <li key="ellipsisEnd" className={styles.ellipsis}>
                    
                </li>
            );
        }

        paginationItems.push(
            <li key="next">
                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            </li>
        );

        return paginationItems;
    };

    return <ul className={styles.pagination}>{renderPaginationItems()}</ul>;
};

export default Paginado;