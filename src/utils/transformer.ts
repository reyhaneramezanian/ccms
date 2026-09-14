abstract class Transformer<Transfer> {
    abstract transforms(transfers: Transfer[] | Transfer): any[];
}

export default Transformer;
