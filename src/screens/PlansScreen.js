import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import db from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import SubscriptionItem from "../components/SubscriptionItem";

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const q = query(collection(db, "customers", user.uid, "subscriptions"));
      const subscriptionSnap = await getDocs(q);

      subscriptionSnap.docs.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    };

    fetchSubscription();
  }, [user.uid]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);

      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const q2 = query(collection(db, "products", productDoc.id, "prices"));
        const priceSnap = await getDocs(q2);

        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });

      setProducts(products);
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      },
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51K9PczH8OuCflQVF1yl8C9nYcKhKZy6dCTwlG72AS4dUQ8K5D4X928xpM4PSmB6oxsLz06dZEEA9IhhQS7uaqEKK002S0GVaxh",
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div>
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription.current_period_end * 1000,
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <SubscriptionItem
            key={productId}
            name={productData.name}
            description={productData.description}
            subscribe={() => loadCheckout(productData.prices.priceId)}
            currentPackage={isCurrentPackage}
          />
        );
      })}
    </div>
  );
};

export default PlansScreen;
