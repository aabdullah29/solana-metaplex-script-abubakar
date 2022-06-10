import { Connection } from "@metaplex/js";
import { Account } from "@metaplex-foundation/mpl-core";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios"

//Connection have made here with the mainnet Cluster of the Solana
const connection = new Connection("mainnet-beta");
//The token address is passed here of the NFT of which data we have to fetch.
const NFT_Token_Address = "EPr4X3pqEMT7Eeu8YH9bt7uTD2PQ96rDP6NGU5PVoXaD";


const get_NFT_Meta_Data = async () => {
  //here we are storing the program derived address of the token into a variable named metaData
  const PDA_metaData = await Metadata.getPDA(NFT_Token_Address);
  
  //getting the account info by the program dervied address, We are getting the following information 
  //e.g. Account  Public key, rentEpoch, Lamports, etc 
  const mintAccInfo = await connection.getAccountInfo(PDA_metaData);

  const {
    data: { data: meta_Data }
  } = Metadata.from(new Account(NFT_Token_Address, mintAccInfo));

  //Printing out the MetaData of the token address
  console.log(meta_Data);

  //Fetching the data of the URI we obtained from the metadata
  let uri_Data = await axios.get(meta_Data.uri);
  //Printing the data of the URI 
  console.log(uri_Data.data);
};

get_NFT_Meta_Data();
