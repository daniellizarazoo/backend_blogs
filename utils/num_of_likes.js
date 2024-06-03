const numOfLikes = (blogs) =>{

    if(blogs.length===0){
        return 0
    }

    const reducer = (sum,item)=>{
        return sum + item.likes
    }

    const totalLikes = blogs.reduce(reducer,0)
    
    return totalLikes
}

const favorite = (blogs)=>{
    var mayor = -Infinity
    var info = {}
    for(let i in blogs){
        if(blogs[i].likes>mayor){
            mayor = blogs[i].likes
            info['i'] = parseInt(i)
            info['_id'] = blogs[i]._id
        }
    }

    return blogs[info.i]
}


module.exports = {numOfLikes,favorite}