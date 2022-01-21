import  jwt  from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'jwT-seed';
    private static expire: string = '30d';
    
    cosntructor() { }
    
    static getJwtToken(payload: any): string {
        
        return jwt.sign( { user: payload},this.seed, {expiresIn: this.expire});
    }

    static validateToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {}
            
                resolve(decoded);
            })
        } )
    
    }
}