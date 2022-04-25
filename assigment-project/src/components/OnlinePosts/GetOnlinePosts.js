import React, { Component } from 'react';


class GetOnlinePosts extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            posts : [],
            sortType: 'asc',//for sorting
            search: "",  //for filtering
            search2: 0
        };
    }

    //for sorting
    onSort = sortType =>{
        this.setState({sortType})
    }

    //for filtering
    onchange = search =>{
        this.setState({search});
    }

    onchange2 = search2 =>{
        this.setState({search2});
    }

    componentDidMount() {
        fetch("https://restcountries.com/v2/all?fields=name,region,area")
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    posts : result
                });
            },

            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
    }

    render() {
        // const {error, isLoaded, posts,sortType} = this.state;
        const {error, isLoaded} = this.state;

        //for sorting
        const{posts,sortType}=this.state;

        //for filtering
        const{search}=this.state

        const {search2} = this.state;

        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{

            //sorting method
            posts.sort((a,b)=> {
                const isReversed = (sortType ==='asc') ? 1 : -1;
                return isReversed * a.name.localeCompare(b.name)
            })

            // const sorted = posts.sort((a,b)=> {
            //     const isReversed = (sortType ==='asc') ? 1 : -1;
            //     return isReversed * a.name.localeCompare(b.name)
            // })

            //filtering method
            const filtered = posts.filter(post => {
                if(post.area || search2!=0)//post has area and area size exists. Additional filter search2
                {
                    return post.region.toLowerCase().indexOf(search.toLowerCase()) !== -1 && post.area > (search2)
                }
                return post.region.toLowerCase().indexOf(search.toLowerCase()) !== -1 //to display area size blank data
            })

            

            return(
                <div>
                    <p className="TextAboveButtons"><b>Sorting:</b></p>
                    <div className="Sort">
                        <button className='button' onClick={()=>this.onSort('asc')}>Sort by ascending</button>
                        <button className='button' onClick={()=>this.onSort('desc')}>Sort by descending</button>
                    </div>

                    {/* filter */}
                    <p className="TextAboveButtons"><b>Filtering:</b></p>
                    <div className="Filter">
                        <button className='button' onClick={()=> {this.onchange("");this.onchange2(0)}}>Clear filter</button>  
                        <button className='button' onClick={()=>this.onchange("Oceania")}>Filter Oceania</button>
                        <button className='button' onClick={()=>this.onchange2(65300)}>Filter bigger than Lithuania</button>
                    </div>

                    <ol className="item">
                    {
                        filtered.map(post => (
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
                </div>
            );
        }
      
    }

    


}

export default GetOnlinePosts;