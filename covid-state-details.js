import { component, useEffect, useState } from 'haunted'
import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map';


function fetchState(state) {
    return fetch(`https://api.covidtracking.com/v1/states/${state}/current.json`)
        .then(res => res.json())
}

function CovidStateDetails({ state }) {
    const [stateData, setStateData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchState(state)
            .then(data => {
                setStateData(data)
                setLoading(false)
            })
    }, [state])

    return StateDetailsCard(loading, stateData)
}

function StateDetailsCard(loading, data) {
    const styles = {
        backgroundColor: '#eee',
        borderRadius: '4px',
        padding: '24px',
        display: 'block', 
        width: '300px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return loading ? html`<div style=${ styleMap(styles) }>
            <span>Loading...</span>
        </div>` : html`
        <div style=${ styleMap(styles) }>
            <div>
                <h3 style="margin-top: 0px; margin-bottom: 8px">${data.state}</h3>
                <small style="margin-bottom: 4px; display: block"><strong>Today</strong></small>
                ${StateDetailRow('Last Updated', new Date(data.lastUpdateEt).toLocaleString())}
                ${StateDetailRow('Positive Cases', data.positive)}
                ${StateDetailRow('Pending Cases', data.pending)}
                ${StateDetailRow('Negative Cases', data.negative)}
                ${StateDetailRow('Deaths', data.deathConfirmed)}
                ${StateDetailRow('Total Test Results', data.totalTestResults)}
            </div>
        </div>
    `
}

function StateDetailRow(key, value) {
    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: '4px'
    }

    return html`
        <div style=${ styleMap(styles) }>
            <span style="font-weight: light">${key}</span>
            <span>${value || 'No Data'}</span>
        </div>
    `
}

customElements.define('covid-state-details', component(CovidStateDetails, {
    observedAttributes: ['state']
}))
