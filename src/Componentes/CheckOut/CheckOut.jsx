import { useState } from "react";
import { useCartContext } from "../CartContext/CartContext";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const CheckOut = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [orderId, setOrderId] = useState('');

    const {cart, totalPrice, removeProduct, cleanCart} = useCartContext();

    const formManipulation = (e) => {
        e.preventDefault();
    

    if (!name || !surname || !email || !emailConfirmation || !phone) {
        setError('Es obligatorio completar todos los campos!');
        return;
    }

    if (email !== emailConfirmation) {
        setError('Los emails no coinciden');
        return;
    }

    const total = totalPrice();
    const order = {
        items: cart.map((product) => ({
            id: product.id,
            title: product.name,
            quantity: product.quantity,
        })),

        total: total,
        date: new Date(),
        name,
        surname,
        email,
        phone,
    }

    Promise.all(
        order.items.map(async (productOrder) => {

            const db = getFirestore();
            const productRef = doc(db, 'products', productOrder.id);

            const productDoc = await getDoc(productRef);
            const actualStock = productDoc.data().stock;

            await updateDoc(productRef, {
                stock: actualStock - productOrder.quantity,
            });

        })
    )
    .then(() => {
        const db = getFirestore();
        addDoc(collection(db, 'orders'), order)
        .then((docRef) => {setOrderId(docRef.id);
        removeProduct();
        cleanCart();
        })
        .catch((error) => {
            setError('Error en la orden', error);
        });
    })
    .catch((error) => {
        setError('No actualizó la orden', error);
    });

    setName('');
    setSurname('');
    setEmail('');
    setEmailConfirmation('');
    setPhone('');

    };

    if(orderId) {
        return (
            <div>
                <p>Gracias por comprar. Puedes hacerle seguimiento a tu compra con el siguiente numero: {orderId}</p>
                <Link to='/'>volver al menú principal</Link>
            </div>
        )
    }

  return (
    <div>
        <h3>formulario de compra</h3>

        {cart.map((product) => (
                <div key = {product.id}>

                    <p>producto: {product.name}</p>
                    <p>cantidad: {product.quantity}</p>
                    <p>precio: {totalPrice()}</p>

                </div>
            ))}


        <form onSubmit={formManipulation}>

            
            <div>
                <label>Nombre:</label>
                <input type="text" placeholder="ingesa nombre" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label>Apellido:</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>

            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label>Confirmar email:</label>
                <input type="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
            </div>

            <div>
                <label>Teléfono:</label>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            {error && <p>{error}</p>}

            <div>
                <button type="submit">Finalizar</button>
            </div>

        </form>
      
    </div>
  )
}

export default CheckOut
