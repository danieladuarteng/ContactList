import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        //aqui eu falo qual o tipo de prop que desejo receber, no caso dois objetos
        contacts: PropTypes.array.isRequired,//aqui quero que contato seja um array
        onDeleteContact: PropTypes.func.isRequired,//aqui quero que onDeleteContact receba uma função
    }
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state

        let showingContacts;
        //aqui fazemos a filtragem para que apareçam os contatos conforme o que foi digitado
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))

        } else {
            showingContacts = contacts
        }

        //aqui iremos mostrar os contatos em ordem alfabética
        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to="/create" 
                        className="add-contact"
                    >Add Contact</Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contact) =>
                        (
                            <li key={contact.id} className='contact-list-item'>
                                <div className='contact-avatar' style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                                />
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => onDeleteContact(contact)}
                                    className='contact-remove'>
                                    Remove
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}




export default ListContacts;