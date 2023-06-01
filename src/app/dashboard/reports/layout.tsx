export default async function Layout(props: { children: React.ReactNode }) {
    return (
        <>
            <aside>{props.children}</aside>
        </>
    );
}
