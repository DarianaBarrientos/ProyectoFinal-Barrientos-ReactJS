import { useState } from "react";
import { useCartContext } from "../CartContext/CartContext";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import sticker from "../../assets/img/sticker-orden.jpeg"

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
        setError('→ Es obligatorio completar todos los campos!');
        return;
    }

    if (email !== emailConfirmation) {
        setError('→ Los emails no coinciden!');
        return;
    }

    if (phone.length < 10 || phone.length > 10) {
        setError('→ Tu teléfono debe tener 10 dígitos!');
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
        setError('Hay un problema con tu pedido', error);
    });

    setName('');
    setSurname('');
    setEmail('');
    setEmailConfirmation('');
    setPhone('');

    };

    if(orderId) {
        return (
            <div className="ordenId">
                <img className="sticker" src={sticker} alt="sticker"></img>
                <p>Gracias por tu compra! Puedes hacerle seguimiento con el siguiente ID: <span className="ordenId-span">{orderId}</span></p>
                <Link className="orden-volver-menu" to='/'>Volver al menú principal</Link>
            </div>
        )
    }

  return (
    <div className="checkout">
        <h3 className="formulario-titulo">Pedido</h3>

        <div className="items-checkout-container">
            {cart.map((product) => (
                    <div className="items-checkout" key = {product.id}>

                        <p>Producto: {product.name}</p>
                        <p>Cantidad: {product.quantity}</p>

                    </div>
                ))}
            <p className="precio-total-checkout">Total: {totalPrice()}</p>
        </div>
        
        <h3 className="formulario-titulo-dos">Formulario de compra</h3>

        <form className="form-container" onSubmit={formManipulation}>

            
            <div className="form-container">
                <label>Nombre:</label>
                <input className="form-input" type="text" placeholder="ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-container">
                <label>Apellido:</label>
                <input className="form-input" type="text" placeholder="ingresa tu apellido" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>

            <div className="form-container">
                <label>Email:</label>
                <input className="form-input" type="email" placeholder="ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-container">
                <label>Confirmar email:</label>
                <input className="form-input" type="email" placeholder="confirma tu email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
            </div>

            <div className="form-container">
                <label>Teléfono:</label>
                <input className="form-input" type="number" placeholder="ingresa tu teléfono ej: 1167449836" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            {error && <p className="error-checkout">{error}</p>}

            <div className="boton-checkout">
                <button className="boton-checkout-style" type="submit">Finalizar</button>
            </div>

        </form>
      
    </div>
  )
}

export default CheckOut
