import React, {createContext, Component} from 'react';

export const ThemeContext = createContext();

export default class ThemeContextProvider extends Component {
    state = {
        isLightTheme: true,
        light: { textColor: '#555', navBg: '#ddd', bookListBg: '#eee' },
        dark: { textColor: '#ddd', navBg: '#333', bookListBg: '#555' }
    }

    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme });
    }

    render() {
        return (
            <ThemeContext.Provider value={{
                        ...this.state,
                        toggleTheme: this.toggleTheme
                    }}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
