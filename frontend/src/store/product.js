import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] })); // Update the store
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    // Assuming 'createdAt' is the field representing when the product was added
    const sortedProducts = data.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    set({ products: sortedProducts });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //  Update the store
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Update the store
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: "Product updated successfully" };
  },
}));
