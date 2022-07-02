export async function getRepLogs() {
    return fetchJson('api/reps');
}

export async function deleteRepLog(id) {
    return fetchJson(`api/reps/${id}`, {method: 'DELETE'});
}

async function fetchJson(url, options) {
    return await (await fetch(url, Object.assign(
        {
            credentials: 'same-origin'
        }, options))).json();
}
