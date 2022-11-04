import React, { Component } from 'react';
import './DropDown.css';
import { ReactComponent as Arrow } from './imgs/arrow.svg';
import { ReactComponent as Close } from './imgs/close.svg';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            open: false,
            options: [],
            selected: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
    }
    componentDidMount()  {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1c27e642d8cedef632716f85732ec043&language=en-US&page=1")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    loaded: true,
                    options: json,
                });
            });
    }
    getOptions() {
        let res = this.state.options.results.map(option  => {
            return <div className={`DropDown-Opt ${this.state.selected === option.title && 'Selected'}`} onClick={this.handleOptionSelect}>{option.title}</div>
        });
        return res;
    }
    handleClick() {
        this.state.open ? this.setState({ open: false }) : this.setState({ open: true });
    }
    handleOptionSelect(event) {
        const selected = event.target.innerText;
        this.setState({ selected });
    }
    handleOptionClear(event) {
        event.stopPropagation();
        this.setState({
            selected: ''
        });
    }
    render() {
        const options = this.state.open ? <div className={'DropDown-Opts'}>
            {this.getOptions()}
        </div> : null;

        return <div className='DropDown' onClick={this.handleClick}>
            <div className='DropDown-Selector'>
                <div className='Selected-Text'>{this.state.selected}</div>
                <div className='Close'>{this.state.selected && <Close onClick={this.handleOptionClear.bind(this)} />}</div>
                <div className='Arrow'><Arrow transform={this.state.open &&  'scale(1, -1)'} /></div>
            </div>
            {options}
        </div>
    }
}

export default DropDown;