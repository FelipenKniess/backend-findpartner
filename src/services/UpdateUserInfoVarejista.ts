import User from '../models/Users';
import Address from '../models/Address';
import {getRepository} from 'typeorm';
import AppError from "../errors/AppError";

interface Request {
    id: string,
    description: string,
    telephone: string,
    city: string,
    uf: string,
    district: string,
    number: string,
    street: string,
}

class UpdateUserInfoVarejista {
    public async execute({id, description, telephone, city, uf, district, number, street}: Request): Promise<User>{
      const userRepository = getRepository(User);
      const addressRepository = getRepository(Address);

      var UserFind = await userRepository.findOne(id);

      if(!UserFind){
        throw new AppError('Only authenticated users can update data');
      }

      var AddressFind = await addressRepository.findOne({
        where: {
          user_id: id
        }
      });

      var completeAddress = {
          user_id: id,
          city,
          uf,
          district,
          number,
          street,
          longitude: '',
          latitude: ''
      }

      if(!AddressFind){
        // const {} = this.getCoordenates(completeAddress);

        const newAddress = addressRepository.create(completeAddress)

        await addressRepository.save(newAddress);
      } else {
        AddressFind.city = city;
        AddressFind.uf = uf;
        AddressFind.district = district;
        AddressFind.number = number;
        AddressFind.street = street;

        this.getCoordenates(completeAddress);

        await addressRepository.save(AddressFind);
      }

      UserFind.description = description;
      UserFind.telephone = telephone;

      await userRepository.save(UserFind);
      UserFind.address = completeAddress;

      return UserFind;
    }

    private getCoordenates ({city, uf, street, number, district }: any){
      console.log(city, uf, street, number, district);
    }
}

export default UpdateUserInfoVarejista;
