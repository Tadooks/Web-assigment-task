import React, { Component } from 'react';
import posts from './posts.js';
// get posts from online api
class GetLocalPosts extends Component {
    constructor(props){
        super(props);
        this.state = {   
            sortType: 'desc',//for sorting       
            posts :posts,
            search: "",  //for filtering
            search2: 0,
        };
    }

    onSort = sortType =>{
        this.setState({sortType})
    }

    

    onchange = search =>{
        this.setState({search});
    }

    onchange2 = search2 =>{
        this.setState({search2});
    }





    render() {
        
        const {posts,sortType} = this.state;//for sorting
        
        const {search,filterType} = this.state;//for filter

        const {search2} = this.state;//for filter

        //sorting method
        const sorted = posts.sort((a,b)=> {
            const isReversed = (sortType ==='asc') ? 1 : -1;
            return isReversed * a.name.localeCompare(b.name)
        })

        //filtering method
        const filtered = posts.filter(post => {
            if(post.area || search2!=0)
            {
                return post.region.toLowerCase().indexOf(search.toLowerCase()) !== -1 && post.area > (search2)
            }
            return post.region.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        


        return(
            <div>
                {/* sorting */}
                <div className="col">
                    <button className='button' onClick={()=>this.onSort('asc')}>SORT by asc</button>
                    <button className='button' onClick={()=>this.onSort('desc')}>SORT by desc</button>
                </div>
                
                {/* filter */}
                <button className='button' onClick={()=> {this.onchange("");this.onchange2(0)}}>Clear filter</button>

                <button className='button' onClick={()=>this.onchange("Oceania")}>SORT oceania</button>
                <button className='button' onClick={()=>this.onchange2(1580)}>SORT country size</button>
                


                <ol className="item">
                {
                    
                    posts.map(post => (
                        <li className="Countryblock" key={post.name} align="start">
                            <div>
                                <p className="name">Country: {post.name}</p>
                                <p className="region">Region: {post.region}</p>
                                <p className="area">Area size: {post.area}</p>
                                <p className="independent">{post.independent}</p>
                            </div>
                        </li>
                    ))
                }
                </ol>
                <ol className="item">
                {
                    
                    
                    filtered.map(post => (
                        <li className="Countryblock" key={post.name} align="start">
                            <div>
                                filtered
                                <p className="name">Country: {post.name}</p>
                                <p className="region">Region: {post.region}</p>
                                <p className="area">Area size: {post.area}</p>
                                <p className="independent">{post.independent}</p>

                                {/* <p className="name">Country: {post.name} <br/> {post.region} </p>
                                <p className="region">Region: {post.region}</p>
                                <p className="area">Area size: {post.area}</p>
                                <p className="independent">{post.independent}</p> */}
                            </div>
                        </li>
                    ))
                }
                </ol>
            </div>
        );
    }
  }
  
  export default GetLocalPosts;