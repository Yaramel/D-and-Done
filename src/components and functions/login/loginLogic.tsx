/* eslint-disable @typescript-eslint/no-explicit-any */

//Table Original
const table1 = "https://tableofmanythings-8000.restdb.io/";
const key1 = '664dd625f13d107ff4c38386';

// //Table de Emergencia 1
// const table1 = "https://tableofmorethings-edae.restdb.io/";
// const key1 = '66759aedbe0bc81043eafcf7';

//Table de Emergencia 2 - Yara
// const table1 = "https://tableofevemorethings-abb1.restdb.io/";
// const key1 = '6675b8f5be0bc805bfeb00c1';

// //Table de Emergencia 3 - Yara
// const table1 = "https://tableofinfinitthings-8b98.restdb.io/";
// const key1 = '6675bf02be0bc81942eb0158';

export async function getUserInfo(username: string) {
    
    try {
        const response = await fetch(`${table1}rest/users-info?q={"username":"${username}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json' // Ensure Content-Type is correct
            }
            
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export async function postUserInfo(username: string, password: string, email: string, isMaster: boolean) {
    const info = {
        username: username,
        password: password,
        email: email,
        isMaster: isMaster
    };

    try {
        const response = await fetch(`${table1}rest/users-info`, {
            method: 'POST',
            headers: {
                'x-apikey': key1,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error('Network response was not ok || ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}