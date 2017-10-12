import React from 'react'
import Header from 'Header/Header'
import css from './App.module.scss'

class App extends React.Component {
    render() {
        return (
            <div className={css.container}>
                <Header />
                <div className={css.content}>
                    Content
                </div>
            </div>
        )
    }
}

export default App