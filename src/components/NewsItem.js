import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        // desconstruction the props 
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                {/* //making a card to show the image, title, description, author and date */}
                <div className="card" style={{ borderRadius: '8px' }}>

                <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute'}}>
                    {/* //showing the source of the articles like a badge  */}
                    <span class="badge rounded-pill bg-primary" style={{ zIndex: 1, left: '90%' }}>{source}</span>
                </div>

                    {/* //showing the image for the article */}
                    <img src={imageUrl} className="card-img-top" alt="..." style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', height: '176px' }}/>
                        <div className="card-body">
                            {/* //showing the alredy title of the article  */}
                            <h5 className="card-title">{title}</h5>  
                            
                            {/* //showing the already sliced description of the article  */}
                            <p className="card-text">{description}</p>

                            {/* //showing the author and the date of the article  */}
                            <p className="card-text"><small className="text-muted"> by {author ? author : "unknown"} on {new Date(date).toGMTString().slice(0, 22)} </small></p>

                            {/* //button for redirecting to the original articles website link  */}
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm" style={{ backgroundColor: '#333456', color: 'white', borderRadius: '8px' }}>Read more</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
