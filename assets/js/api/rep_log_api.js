export async function getRepLogs() {
    return await (await fetch('api/reps')).json();
}
