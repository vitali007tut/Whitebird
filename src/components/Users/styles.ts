export const card = () => {
    return {

        background: '#1e1e1e',
        padding: '5px 15px',
        marginBottom: '10px',
        borderRadius: '5px',
        width: 'auto',
        transition: 'all .5s',
    
        '&:hover': {
            cursor: 'pointer',
            fontWeight: '600',
            background: '#000',
        },
    
        '&.active': {
            background: '#115'
        }
    }
}

export const title = {
    display: 'flex',
    justifyContent: 'space-between',
    height: '30px',
}