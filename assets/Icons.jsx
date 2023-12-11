import styles from '../styles/Icons.module.css'

export function GraphicLoader() {
    return (
        <div className={styles.loading}>
            <svg width="64px" height="48px" className={styles.svg}>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back" className={styles.polyline}></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front" className={styles.polyline}></polyline>
            </svg>
        </div>
    )
}