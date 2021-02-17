const {Sequelize, DataTypes} = require('sequelize');
//lin1 + line 2
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres:localhost/acme_countrdropy_club');

const Facility = conn.define('facility',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    fac_name:{
        type:DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
});

const Member = conn.define('member',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    first_name:{
        type:DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
});

const Booking = conn.define('booking',{
    id:{
      primaryKey:true,
    },
    startTime:{
        type:DataTypes.DATE(),
        allowNull: false,
    },
    endTime:{
        allowNull: false,
    },
    fac_name:{
        type:DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
});

const syncAndSeed = async()=>{
    await conn.sync(options: {force:true});
    const [tennis_court,club_house,larry,moe] = await Promise.all([
        Facility.create({name : 'tennis_court'}),
        Facility.create({name : 'club_house'}),
        Member.create({name : 'larry'}),
        Member.create({name : 'moe'}),
 ]);
};

const init = async()=>{
    try{
      await conn.authenticate();
      await syncAndSeed();
      const port = process.env.PORT || 1337;
      app.listen(port,()=>console.log(`Listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
};

init();