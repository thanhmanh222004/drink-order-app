import React, { useState } from "react";

const menuDrinks = [
  // CÀ PHÊ
  { id: 1, name: "Coffe đá", price: 15000, category: "Cà phê" },
  { id: 2, name: "Coffe Sữa", price: 18000, category: "Cà phê" },
  { id: 3, name: "Coffe Sữa tươi", price: 18000, category: "Cà phê" },
  { id: 4, name: "Bạc xỉu", price: 20000, category: "Cà phê" },
  { id: 5, name: "Coffe kem muối", price: 20000, category: "Cà phê" },
  { id: 6, name: "Coffe sữa tươi sương sáo", price: 22000, category: "Cà phê" },
  { id: 7, name: "Bạc xỉu cốt dừa", price: 22000, category: "Cà phê" },

  // TRÀ TRÁI CÂY
  { id: 8, name: "Trà Tắc Thái xanh", price: 15000, category: "Trà trái cây" },
  { id: 9, name: "Trà xoài", price: 20000, category: "Trà trái cây" },
  { id: 10, name: "Trà xoài chanh dây", price: 20000, category: "Trà trái cây" },
  { id: 11, name: "Trà ổi hồng", price: 20000, category: "Trà trái cây" },
  { id: 12, name: "Trà dưa lưới", price: 25000, category: "Trà trái cây" },
  { id: 13, name: "Trà lài đất thơm", price: 25000, category: "Trà trái cây" },
  { id: 14, name: "Trà trái cây nhiệt đới", price: 25000, category: "Trà trái cây" },

  // LATTE
  { id: 15, name: "Matcha lattee (M)", price: 20000, category: "Latte" },
  { id: 16, name: "Khoai môn lattee (M)", price: 20000, category: "Latte" },
  { id: 17, name: "Cacao lattee (M)", price: 20000, category: "Latte" },
  { id: 18, name: "Tàu phớ", price: 20000, category: "Latte" },
  { id: 19, name: "Matcha lattee (L)", price: 25000, category: "Latte" },

  // BEST SELLER
  { id: 20, name: "Sữa Hồng machiato (M)", price: 25000, category: "Best Seller" },
  { id: 21, name: "Sữa Hồng machiato (L)", price: 30000, category: "Best Seller" },
];
const groupedMenu = menuDrinks.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {});


export default function DrinkOrderApp() {
  const [order, setOrder] = useState([]);
  const [ordersList, setOrdersList] = useState([]); // danh sách đơn đã ra

  const addToOrder = (drink) => {
    const exist = order.find((item) => item.id === drink.id);
    if (exist) {
      setOrder(
        order.map((item) =>
          item.id === drink.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setOrder([...order, { ...drink, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setOrder(order.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const removeItem = (id) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  const totalPrice = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Ra đơn: thêm đơn vào ordersList, clear giỏ hàng
  const handleCreateOrder = () => {
    if (order.length === 0) return;
    const newOrder = {
      id: Date.now(), // id đơn duy nhất
      items: order,
      total: totalPrice,
      paid: false,
    };
    setOrdersList([...ordersList, newOrder]);
    setOrder([]); // reset giỏ hàng
  };

  // Thanh toán đơn
  const handlePayOrder = (id) => {
    setOrdersList(
      ordersList.map((ord) =>
        ord.id === id ? { ...ord, paid: true } : ord
      )
    );
  };

  // CSS styles giống phần trên (để ngắn mình bỏ qua bạn có thể lấy lại nhé)
  const styles = {
    container: {
      maxWidth: 480,
      margin: "20px auto",
      padding: 20,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
      fontWeight: "700",
      letterSpacing: 1.2,
    },
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      padding: 12,
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
    },
    btnAdd: {
      padding: "6px 16px",
      backgroundColor: "#28a745",
      border: "none",
      borderRadius: 6,
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: 14,
      padding: 12,
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
    },
    qtyInput: {
      width: 60,
      padding: "6px 8px",
      fontSize: 15,
      borderRadius: 6,
      border: "1.5px solid #ccc",
      marginRight: 12,
      textAlign: "center",
      outline: "none",
      transition: "border-color 0.3s",
    },
    btnRemove: {
      padding: "6px 14px",
      backgroundColor: "#dc3545",
      border: "none",
      borderRadius: 6,
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    total: {
      textAlign: "right",
      fontWeight: "700",
      fontSize: 20,
      marginTop: 24,
      marginBottom: 20,
      color: "#111",
    },
    btnOrder: {
      width: "100%",
      padding: 14,
      fontSize: 18,
      fontWeight: "700",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: 8,
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      userSelect: "none",
    },
    btnOrderDisabled: {
      backgroundColor: "#999",
      cursor: "not-allowed",
    },
    ordersList: {
      marginTop: 40,
    },
    orderCard: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      marginBottom: 20,
    },
    orderHeader: {
      fontWeight: "700",
      marginBottom: 12,
      color: "#222",
      fontSize: 16,
    },
    orderItems: {
      marginBottom: 12,
      lineHeight: 1.5,
      color: "#333",
    },
    payButton: {
      padding: "8px 14px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: 6,
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    payButtonDisabled: {
      backgroundColor: "#999",
      cursor: "not-allowed",
    },
    paidLabel: {
      color: "#28a745",
      fontWeight: "700",
      fontSize: 16,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Menu Nước</h2>
      <div>
        {Object.keys(groupedMenu).map((category) => (
          <div key={category}>
            <h3 style={{ ...styles.title, fontSize: 18, textAlign: "left", marginTop: 30 }}>
              {category}
            </h3>
            {groupedMenu[category].map((drink) => (
              <div key={drink.id} style={styles.menuItem}>
                <div>
                  <span style={{ fontWeight: 600 }}>{drink.name}</span> -{" "}
                  {drink.price.toLocaleString()}₫
                </div>
                <button
                  style={styles.btnAdd}
                  onClick={() => addToOrder(drink)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#218838")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#28a745")
                  }
                >
                  Thêm
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>


      <h2 style={{ ...styles.title, marginTop: 40 }}>Giỏ hàng</h2>
      {order.length === 0 && (
        <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
          Chưa có món nào trong giỏ.
        </p>
      )}
      {order.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <div style={{ flex: 1 }}>
            {item.name} - {item.price.toLocaleString()}₫
          </div>
          <input
            type="number"
            min={1}
            value={item.qty}
            onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
            style={styles.qtyInput}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
          <button
            style={styles.btnRemove}
            onClick={() => removeItem(item.id)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#c82333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc3545")
            }
          >
            Xóa
          </button>
        </div>
      ))}

      <h3 style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()}₫</h3>

      <button
        style={{
          ...styles.btnOrder,
          ...(order.length === 0 ? styles.btnOrderDisabled : {}),
        }}
        onClick={handleCreateOrder}
        disabled={order.length === 0}
      >
        Ra đơn
      </button>

      {/* Hiển thị danh sách đơn đã tạo */}
      <div style={styles.ordersList}>
        <h2 style={styles.title}>Danh sách đơn hàng</h2>
        {ordersList.length === 0 && (
          <p style={{ textAlign: "center", color: "#777", fontStyle: "italic" }}>
            Chưa có đơn hàng nào.
          </p>
        )}
        {ordersList.map((ord) => (
          <div key={ord.id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              Đơn #{ord.id} - Tổng: {ord.total.toLocaleString()}₫
            </div>
            <div style={styles.orderItems}>
              {ord.items.map((it) => (
                <div key={it.id}>
                  {it.name} x {it.qty} = {(it.price * it.qty).toLocaleString()}₫
                </div>
              ))}
            </div>
            {ord.paid ? (
              <div style={styles.paidLabel}>Thanh toán thành công ✅</div>
            ) : (
              <button
                style={styles.payButton}
                onClick={() => handlePayOrder(ord.id)}
              >
                Thanh toán
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
