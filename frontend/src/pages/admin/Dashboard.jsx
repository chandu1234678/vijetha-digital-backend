import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="py-10 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-600">
          Manage orders and products for Vijetha Digital
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Orders */}
          <Card>
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-sm text-gray-600 mt-1">
              View and manage customer orders
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/admin/orders")}
            >
              Manage Orders
            </Button>
          </Card>

          {/* Products */}
          <Card>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-sm text-gray-600 mt-1">
              View or delete products
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/admin/products")}
            >
              View Products
            </Button>
          </Card>

          {/* Add Product */}
          <Card>
            <h2 className="text-lg font-semibold">Add Product</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a new product for customers
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/admin/products/new")}
            >
              Add New Product
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}
