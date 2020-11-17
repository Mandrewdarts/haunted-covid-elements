import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';

function fetchStates() {
    return fetch('https://api.covidtracking.com/v1/states/info.json')
        .then(res => res.json())
}

function CovidStatList() {
    const [loading, setLoading] = useState(true)
    const [states, setStates] = useState(null)

    useEffect(() => {
        fetchStates()
            .then(data => {
                setStates(data);
                setLoading(false);
            })
    }, [])

    const onStateSelected = (e) => {
        const event = new CustomEvent('state-selected', {
            detail: { state: e.target.value },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }

    const Loading = () => html`<h3>Loading...</h3>`

    const StateSelect = ({ states, onChange }) => html`
        <div>
            <select @change=${onChange}>
                ${states.map(state => html`
                <option .value=${state.state}>
                    ${state.name}
                </option>
                `)}
            </select>
        </div>
    `

    return loading ? Loading() : StateSelect({ states, onChange: onStateSelected })
}

customElements.define('covid-state-list', component(CovidStatList))