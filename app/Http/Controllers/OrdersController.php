<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Transactions;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use DB;
use Mail;

class OrdersController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return Orders::with('user')->get(); 
        //relations can be also used 

        $customer   = \Auth::user()->id;
        
        $orders = DB::table('orders')
            ->select('orders.*', 'users.name as cutomer_name','products.title')
            ->leftJoin('users', 'orders.customer_id', '=', 'users.id')
            ->leftJoin('products', 'orders.product_id', '=', 'products.id')
            ->where('orders.customer_id',$customer)
            ->orderBy('orders.id','asc')->get();
        return response()->json($orders);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showOrders()
    {
         return view('show-orders');

    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'product_id'=>'required',
            'quantity'=>'required'
        ]);

        try{
            
            $params     =  $request->all();
            $customer   = \Auth::user()->id;

            $product = Product::where('id',$params['product_id'])->first();

            $order                   = new Orders;
            $order->product_id       = $params['product_id'];
            $order->customer_id      = $customer;
            $order->status           = 'pending' ;
            $order->product_quantity = $params['quantity'] ;
            
            if($order->save()){
                $transaction               = new Transactions;
                $transaction->order_id     = $order->id;
                $transaction->customer_id  = $customer;
                $transaction->price        = $product->price * $params['quantity'];
                $transaction->status       = 'in-progress';
                if($transaction->save()){

                    //send  mail to user
                    //---------------------------------------------------------

                    $passdata = array(
                        'email' => \Auth::user()->email,
                        'name' => 'versha' 
                    );
                    Mail::send('emails.order', $passdata, function($message) use ($passdata)
                        {
                            $message->from('health@fitnessfirst-me.com', "LF Demo");
                            $message->subject("Welcome to Life Pharmacy demo");
                            $message->to($passdata['email']);
                        });


                    return response()->json([
                        'message'=>'Orders Created Successfully!!'
                    ]);

                }

            }

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating  Orders!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function show($order)
    {
      
       $customer   = \Auth::user()->id;
        
        $orders = DB::table('orders')
            ->select('orders.*', 'users.name as cutomer_name','products.title','products.price','transactions.price as total_price','transactions.status as trans_status','transactions.id as trans_id')
            ->leftJoin('users', 'orders.customer_id', '=', 'users.id')
            ->leftJoin('products', 'orders.product_id', '=', 'products.id')
            ->leftJoin('transactions', 'orders.id', '=', 'transactions.order_id')
            ->where('orders.id',$order)
            ->orderBy('orders.id','asc')->get();
        return response()->json($orders);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function edit(Orders $orders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Orders $orders)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function destroy(Orders $orders)
    {
        //
    }
}
