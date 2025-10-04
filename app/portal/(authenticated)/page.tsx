import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getAuthenticatedCustomer } from '@/lib/session'
import PortalOrderForm from '@/components/PortalOrderForm'

export default function PortalDashboardPage() {
  const customer = getAuthenticatedCustomer()

  if (!customer) {
    redirect('/portal/login')
  }

  return (
    <main className="portal-dashboard">
      <div className="container portal-dashboard-inner">
        <header className="portal-dashboard-header">
          <div>
            <span className="section-eyebrow">Client Portal</span>
            <h1>{customer.displayName}</h1>
            <p>Review inventory, track recent orders, and submit restock or project requests.</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="button button-secondary">
              Sign out
            </button>
          </form>
        </header>

        <section className="portal-card">
          <h2>Inventory Snapshot</h2>
          <div className="portal-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>On Hand</th>
                  <th>Reorder Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customer.products.map((product) => {
                  const belowReorder = product.inventory <= product.reorderPoint
                  return (
                    <tr key={product.id} className={belowReorder ? 'inventory-low' : undefined}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.inventory}</td>
                      <td>{product.reorderPoint}</td>
                      <td>
                        <Link href={`#order-${product.id}`} className="portal-inline-link">
                          Request more
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="portal-card">
          <h2>Recent Orders</h2>
          <div className="portal-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {customer.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.items
                        .map((item) => {
                          const product = customer.products.find((p) => p.id === item.productId)
                          return `${product?.name ?? item.productId} (${item.quantity})`
                        })
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="portal-card" id="order-form">
          <h2>Submit New Order</h2>
          <PortalOrderForm products={customer.products} />
        </section>
      </div>
    </main>
  )
}
