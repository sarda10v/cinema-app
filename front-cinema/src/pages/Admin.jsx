import React from 'react';
import styles from './Admin.module.css'
const Admin = () => {
    return (
        <div className={styles.adminWrapper}>
            Admin Panel
            <input type="text" name="name" id="" />
            <textarea type="text" name="description" id="" />
            <input type="text" name="year" id="" />
            <input type="text" name="actors" id="" />
            <input type="text" name="tags" id="" />
            <input type="text" name="genres" id="" />
        </div>
    );
};

export default Admin;