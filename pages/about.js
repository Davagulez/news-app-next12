import Link from "next/link"
import PageLayout from "../components/PageLayout"

export default function About() {
    return (
        <PageLayout title="NewsApp - About">
            <h1>Esta es la nueva pagina de about</h1>
            <Link href={'/'}> ir a Home</Link>
        </PageLayout>
    )
    
}