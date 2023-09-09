import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <Image src={'logo.svg'} width={100} height={100} alt="Blog Logo" />
        </main>
    );
}
